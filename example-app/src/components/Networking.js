
export const setModelList =(setState, state, modelName, list) =>{
    const newData = Array.isArray(list) ? list : []
    setState({...state, [modelName]: newData })
}

export const stateCreateModel = (setState, state, modelName, newObj) => {
    setState(
        {
            ...state,
            [modelName]: state[modelName] ? [...state[modelName], newObj] : [newObj]
        }
    );
    
}

export const getModel = (setState, state, modelName, id) =>{
    return state ? state[modelName] ? state[modelName].find(a => a["_id"] === id) : undefined : undefined
}

export const updateModel = (setState, state, modelName, id, newObj) =>{
    setState({
        ...state,
        [modelName]: state[modelName] ? [...state[modelName].filter(obj => obj["_id"] !== id), newObj] : []
    })
}

export const deleteModel = (setState, state, modelName, id) =>{
    setState({
        ...state,
        [modelName]: state[modelName] ? [...state[modelName].filter(obj => obj["_id"] !== id)] : []
    })
}
