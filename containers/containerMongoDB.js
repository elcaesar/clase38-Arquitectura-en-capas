const mongoose = require('mongoose')

class ContainerMongoDB {
  constructor(model){
    this.model = model
  }

  async getById(id) {
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        
        const item = await this.model.findById(id);
        return item;
    }
    catch(error){
        return `Hubo un error "${error}"`
    }
  }

  async getAll() {
      try{
          const all = await this.model.find({});
          return all;
      }
      catch(error){
          return `Hubo un error "${error}"`
      }
  }

  async saveContent(item) {
      try{
          const id = await this.model.create(item);
          return id;
      }
      catch(error){
          return `Hubo un error "${error}"`
      }
  }

  async deleteById(id) {
      try{
          const deleted = await this.model.findOneAndDelete({ _id: id });
          return id;
      }
      catch(error){
          return `Hubo un error "${error}"`
      }
  }

  async updateById(id,item) {
      try{
          const updated = await this.model.findOneAndUpdate({ _id: id },item);
          return updated;
      }
      catch(error){
          return `Hubo un error "${error}"`
      }
  }
}

module.exports = ContainerMongoDB