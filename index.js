// import redux from 'redux' //ES6 import for react apps
const redux = require('redux') //for simple node js app
const reduxLogger = require('redux-logger')


const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM"

//changes in action will happen only in one place
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First Redux Action"
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: "First Redux Action"
    }
}

// (prevState,action) => newState
// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIcecreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }


        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {

        case BUY_ICECREAM: return {
            ...state,
            numOfIcecreams: state.numOfIcecreams - 1
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer,applyMiddleware(logger)) //redux store created, createStore takes as parameter a reducer, a middleware

console.log('initialState ', store.getState()) //initial state of application

const unsubscribe = store.subscribe(() => {
    // console.log('updated state ', store.getState())
})

store.dispatch(buyCake())   //action dispatched, state updated listener called
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())


unsubscribe() //unsubscribe to any changes in the store
