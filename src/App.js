import React from "react"
import { ThemeProvider } from 'theme-ui'
import { theme } from "./constants/theme"
import Search from "./components/Search"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Repos from "./components/Repos"

const App = () => ( 
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Navbar image={theme.images.avatar}/>
            <Switch>
                <Route path="/repos/:id" component={Repos} />
                <Route path="/" component={Search} exact />
            </Switch>
        </ThemeProvider>
    </BrowserRouter>
)

export default App