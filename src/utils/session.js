class Index {

    setItem = (key, value) => {
        return sessionStorage.setItem( key, JSON.stringify(value) );
    }

    getItem = (key) => {
        let data;
        try{
            data = sessionStorage.getItem(key) ? JSON.parse( sessionStorage.getItem(key) ) : {};
        }catch(err) {
            data = sessionStorage.getItem(key) || '';
        }
        return data;
    }

}

export default new Index();