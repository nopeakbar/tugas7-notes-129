import User from "./UserModel.js";
import Note from "./NoteModel.js";

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });
