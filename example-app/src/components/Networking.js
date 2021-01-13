
export const setModelList = (setState, state, modelName, list) =>{
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

export const updateModel = (setState, state, modelName, id, newObj) => {
    const stateLen = state[modelName].length
    const indexOfId = Array.isArray(state[modelName]) ? state[modelName].findIndex(obj => obj["_id"] == id) : -1
    if(indexOfId !== -1){   
        const leftSide = state[modelName].slice(0, indexOfId)
        const rightSide = state[modelName].slice(indexOfId + 1, stateLen)
        const newArr = [...leftSide, newObj, ...rightSide]
        setState({
            ...state,
            [modelName]: state[modelName] ? newArr : []
        })
    }
}

export const deleteModel = (setState, state, modelName, id) =>{
    setState({
        ...state,
        [modelName]: state[modelName] ? [...state[modelName].filter(obj => obj["_id"] !== id)] : []
    })
}
