import Homepage from "./pages/homepage/homepage.components"
import ShopPage from "./pages/Shop/shop.components"
import {Switch,Route,Redirect} from 'react-router-dom'
import React,{Component} from "react"
import './App.css'
import Header from './components/header/header.component'
import SignUpAndSignInPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from "./redux/user/user.actions"
class App extends Component {
 
  
   unsubscribeFromAuth = null
  componentDidMount()
  {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth)
      {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            
          })
        })
      }
      else
     {
       setCurrentUser(userAuth)
     }
    }) 
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth()
  }
  render()
  {
    return (
    
      <div>
        <Header/>
        <Switch>
          <Route exact={true} path='/' component={Homepage}/>
          <Route exact={true} path="/shop" component={ShopPage}/>
          <Route exact={true} path="/signin" render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignUpAndSignInPage/>)}/>
        </Switch>
        
      </div>
    
    
        
      )
  }
  
}
const mapStateToProps = ({ user  }) => ({
  currentUser: user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
