export default class GenericRepository {
    constructor(dao,model) {
        this.dao = dao;
        this.model = model;
    }

    getAll = (params) => {
        return this.dao.getAll(params,this.model)
    }

    getBy = (params) => {
        return this.dao.findOne(params),this.model;
    }

    save = (data) => {
        return this.dao.save(data,this.model);
    }

    delete = (params) => {
        return this.dao.delete(params,this.model);
    }

    update = (data) => {
        return this.dao.update(data,this.model);
    }

    getLast = () => {
        return this.dao.findOne.limit(1).sort({$natural:-1})
    }

    drop = (params) => {
        return this.dao.drop(params,this.model);
    }

    getByAndPopulate = (params,path) => {
        return this.dao.find(params).populate(path)
    }

}