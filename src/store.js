import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: "",
        fbapiKey: "AIzaSyB7IIP7qb0ip97cR2IHXame5T7K75gDQjU",

    },
    mutations: {
        setToken(state, token){
            state.token = token
        },
        clearToken(state){
            state.token = ""
        }
    },
    actions: {
        initAuth({commit, dispatch}){
            let token = localStorage.getItem("token")
                if(token){
                    commit("setToken", token)
                    router.push("/")
                }
                else{
                    router.push("/auth")
                    return false
                }
        },
        login({commit, dispatch, state}, authData){
            let authLink =  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            if(authData.isUser){
                authLink ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            }
           
            return axios.post(
                authLink + "AIzaSyB7IIP7qb0ip97cR2IHXame5T7K75gDQjU",
                { email : authData.email, password: authData.password, returnSecureToken: true}
                ).then(response => {
                    commit("setToken", response.data.idToken)
                    localStorage.setItem("token", response.data.idToken)
                    
                })
               
        },
        logout({commit, dispatch, state}){
            commit("clearToken")
            localStorage.removeItem("token")
            router.push("/auth")
        }
    },
    getters: {
         isAuthenticated(state){
            return state.token !== ""
         }
    },
})

export default store