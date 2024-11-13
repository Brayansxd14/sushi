import mongoose from 'mongoose'

const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required:true,
    trim:true,
    unique:true
  },
  password: {
    type: String,
    required:true
  }
})

export default mongoose.model('User',esquema)
