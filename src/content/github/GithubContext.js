import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: []
    }

    const [state,dispatch] = useReducer(githubReducer,initialState)

    // Fetch search user
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams ({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const {items} = await response.json()
        
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Fetch Single User
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        if(response.status === 404){
            window.location = '/notfound'
        }else {
            const data = await response.json()
        
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }

    }

    // Fetch Repository
    const getRepos = async (login) => {

        const params = new URLSearchParams ({
            per_page: 10,
            sort : 'created: asc'
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })

    }


    const clearUsers = () => dispatch({type: 'CLEAR_USERS',})

    const setLoading = () => dispatch({type: 'SET_LOADING'})
  
    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        getUser,
        getRepos,
        clearUsers 
    }}>
        {children}
    </GithubContext.Provider>
} 

export default GithubContext 