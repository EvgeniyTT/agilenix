import mongoose from 'mongoose';
import { isValidEmail, isValidPhone } from '../utils/validators';

const isValidUserId = userId => isValidEmail(userId) || isValidPhone(userId);

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    validate: [isValidUserId, 'Invalid userId. Please use email or phone in a format xxx-xxx-xxxx'],
  },
  password: { type: String, required: true },
  tokens: Array,
  type: { type: String, required: true, match: [/phone|email/, 'Invalid user type'] },
}, { collection: 'users' });

const UserModel = mongoose.model('User', UserSchema);

UserModel.create = user => user.save();
UserModel.getByUserPass = (userId, password) => UserModel.findOne({ userId, password });
UserModel.getByToken = token => UserModel.findOne().elemMatch('tokens', { token });
UserModel.update = (_id, user) => UserModel.findOneAndUpdate({ _id }, user);

export default UserModel;
