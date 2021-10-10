import Homepage from "./pages/homepage/homepage.components"
import ShopPage from "./pages/Shop/shop.components"
import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import './App.css'
import Header from './components/header/header.component'
import SignUpAndSignInPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/Checkout/checkout.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from "./redux/user/user.actions"
import { selectCurrentUser } from './redux/user/user.selector'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import { createStructuredSelector } from 'reselect'
class App extends Component {


  unsubscribeFromAuth = null
  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })

        })
          //addCollectionAndDocuments('collections', collectionsArray.map(({title,items}) => ({title,items})))
      }
      else {
        setCurrentUser(userAuth)
        //addCollectionAndDocuments('collections', collectionsArray.map(({title,items}) => ({title,items})))
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (

      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact={true} path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignUpAndSignInPage />)} />
          <Route exact={true} path='/checkout' component={CheckoutPage} />
        </Switch>

      </div>



    )
  }

}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
