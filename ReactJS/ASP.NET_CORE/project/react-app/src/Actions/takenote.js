import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data =>({
    ...data
})

export const fetchAll = () => dispatch => {
        api.takenote().fetchAll()
            .then(response => {
                console.log(response);
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload: response.data
                });
            }
            )
            .catch(err => console.log(err));

}

export const create = (data, onSucces) => dispatch =>{
    data = formateData(data)
    api.takenote().create(data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSucces()
    })
    .catch(err => console.log(err));
}

export const update = (id, data, onSucces) => dispatch =>{
    data = formateData(data)
    api.takenote().update(id, data)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSucces()
    })
    .catch(err => console.log(err));
}

export const Delete = (id, onSucces) => dispatch =>{
    
    api.takenote().delete(id)
    .then(res => {
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSucces()
    })
    .catch(err => console.log(err));
}



