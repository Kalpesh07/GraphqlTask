import axios from 'axios';

class TaskService {

    /**
     * define base url and field schemas here
     * @returns {TaskService}
     */
    constructor() {
        this.apiUrl = 'http://localhost:5000/graphql';
    }

    async getGraphQlData(resource, params, fields) {
        const query = `{${resource} ${this.paramsToString(params)} ${fields}}`
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query}),
        });
        if (res.ok) {
            const body = await res.json();
            console.log(body.data,"body");
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    async getTodos(params = {}) {
        let fields = `{id name completed subtask {name, id, checked}}`
        const data = await this.getGraphQlData('tasklist', params, fields);
        return data.tasklist;     
    };

    async checkSubtask(params = {}) {
        let fields =`{ id name taskid checked }`;
        //console.log("params",params);
        const data = await this.updateGraphQlData('updateSubTask', params, fields);
        //console.log(data);
        return data.updateSubTask;     
    };

    async updateTask(params = {}) {
        let fields =`{ id name completed }`;
        //console.log("params",params);
        const data = await this.updateGraphQlData('updateTask', params, fields);
        //console.log(data);
        return data;     
    };

    async updateGraphQlData(resource, params, fields) {   
        const query = `mutation {${resource} ${this.paramsToString(params)} ${fields}}`;    
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({query:query}),
        });
        if (res.ok) {
            const body = await res.json();
            console.log(body.data,"body");
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    paramsToString(params) {
        let paramString = '';

        if (params.constructor === Object && Object.keys(params).length) {
            let tmp = [];
            for (let key in params) {
                let paramStr = params[key];
                if(paramStr !== '') {
                    if (typeof params[key] === 'string') {
                        paramStr = `"${paramStr}"`;
                    }
                    tmp.push(`${key}:${paramStr}`);
                }
            }
            //console.log("tmp",tmp);
            if (tmp.length) {
                paramString = `(${tmp.join()})`;
            }
            //console.log("tmp",paramString);
        }
        return paramString;
    }

}

export default new TaskService();
