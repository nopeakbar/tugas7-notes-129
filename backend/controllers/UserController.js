import Note from "../models/NoteModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

//Get data Notes
async function getNotes (req, res) {
  try {
    const userId = req.userId;
    const response = await Note.findAll({
      where: { userId: req.userId } 
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//GetID data Notes
async function getNoteById (req, res) {
    try{
        const response = await Note.findOne({
            where:{
                id:req.params.id
            }
        }); //Get seluruh data yang dibuat. Contoh ORM
        res.status(200).json(response);
    }catch(error){
        console.log(error.message);
    }
}

async function registerUser(req, res) {
  try {
    const { name, email, gender, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, gender, password: hashed });
    res.status(201).json({ status: "Success", message: "User registered", data: user });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
}

//Membuat data Note baru
async function createNote (req, res) {
    try {
        const userId = req.userId; // ← ini sudah benar
        const { title, content, date } = req.body;

        await Note.create({
            title,
            content,
            date,
            userId // ← pastikan ini adalah integer
        });

        res.status(201).json({ msg: "Note Created" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Gagal membuat note", detail: error.message }); // ← Tambahkan detail error
    }
};


//Membuat update Note
async function updateNote(req, res) {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await note.update(req.body);
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}


//Membuat delete Note
async function deleteNote(req, res) {
  try {
    await Note.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "Note Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

//Nambah fungsi buat login handler
async function loginHandler(req, res){
  try{
      const{email, password} = req.body;
      const user = await User.findOne({
          where : {
              email: email
          }
      });

      if(user){
        //Data User itu nanti bakalan dipake buat ngesign token kan
        // data user dari sequelize itu harus diubah dulu ke bentuk object
        //Safeuserdata dipake biar lebih dinamis, jadi dia masukin semua data user kecuali data-data sensitifnya  karena bisa didecode kayak password caranya gini :
        const userPlain = user.toJSON(); // Konversi ke object
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;


          const decryptPassword = await bcrypt.compare(password, user.password);
          if(decryptPassword){
              const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn : '30s' 
              });
              const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn : '1d' 
              });
              await User.update({refresh_token:refreshToken},{
                  where:{
                      id:user.id
                  }
              });
              res.cookie('refreshToken', refreshToken,{
                  httpOnly : false, //ngatur cross-site scripting, untuk penggunaan asli aktifkan karena bisa nyegah serangan fetch data dari website "document.cookies"
                  sameSite : 'none',  //ini ngatur domain yg request misal kalo strict cuman bisa akseske link dari dan menuju domain yg sama, lax itu bisa dari domain lain tapi cuman bisa get
                  maxAge  : 24*60*60*1000,
                  secure:true //ini ngirim cookies cuman bisa dari https, kenapa? nyegah skema MITM di jaringan publik, tapi pas development di false in aja
              });
              res.status(200).json({
                  status: "Succes",
                  message: "Login Berhasil",
                  safeUserData,
                  accessToken 
              });
          }
          else{
              res.status(400).json({
                  status: "Failed",
                  message: "Paassword atau email salah",
                
              });
          }
      } else{
          res.status(400).json({
              status: "Failed",
              message: "Paassword atau email salah",
          });
      }
  } catch(error){
      res.status(error.statusCode || 500).json({
          status: "error",
          message: error.message
      })
  }
}

//nambah logout
async function logout(req, res) {
  try {
    const userId = req.userId;
    await User.update({ refresh_token: null }, { where: { id: userId } });
    res.status(200).json({ message: "Logout berhasil dan token dibersihkan." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getNotes, getNoteById, registerUser, createNote, updateNote, deleteNote, loginHandler, logout };
