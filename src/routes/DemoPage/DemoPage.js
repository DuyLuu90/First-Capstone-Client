import React, {Component}from 'react'
import './DemoPage.css'

export default class DemoPage extends Component{
    constructor(props){
        super(props)
        this.state={
            tour: true,
            tabId:1,
        }
    }
    
    renderAccountInfo=()=>{
        return(
            <div className='demo_accounts'>
                <h2>Demo accounts:</h2>
                <div>
                    <h3>Regular user:</h3>
                    <p><span>Username:</span><span> Dunder</span></p>
                    <p><span>Password: </span><span>test@user123 </span><br/></p>
                </div>
                <div>
                    <h3>Admin</h3>
                    <p><span>Username:</span><span> lexlor</span></p>
                    <p><span>Password:</span><span>test@admin123</span></p>
                </div>
                <div>
                    <h3>Forgot username</h3>
                    <p><span>First-Name:</span><span> Dunder</span></p>
                    <p><span>Last-Name:</span><span>Mifflin</span></p>
                    <p><span>Birth-year:</span><span> 2002</span></p>
                </div>
            </div>
        )
    }

    setTab1 = () =>this.setState({tabId:1})
    setTab2 = () =>this.setState({tabId:2})
    setTab3 = () =>this.setState({tabId:3})
    setTab4 = () =>this.setState({tabId:4})

    displayTour = ()=>this.setState({tour: true})

    hideTour = ()=>this.setState({tour:false})

    render(){
        const accounts= this.renderAccountInfo()
        const {tour,tabId}= this.state
        return (
            <div className='demo'>
                <nav>
                    <span className={this.state.tour?'highlight':''} onClick={this.displayTour}>App tour</span> 
                    <span className={!this.state.tour?'highlight':''} onClick={this.hideTour}>Demo accounts</span>
                </nav>
                {!tour && accounts }
                {this.state.tour && 
                <div>
                    <div className='tour_nav'>
                        <span className={tabId===1?'active':''} onClick={this.setTab1}>About</span>
                        <span className={tabId===2?'active':''} onClick={this.setTab2}>Visitor</span>
                        <span className={tabId===3?'active':''} onClick={this.setTab3}>User</span>
                        <span className={tabId===4?'active':''} onClick={this.setTab4}>Admin</span>
                    </div>
                    
                    {tabId===1 &&
                    <div className='tour_content'>
                        <h2>About this app</h2>
                        <div className='app_features'>
                            <div className='text'>
                            Welcome to <strong>dramaPEDIA</strong>. Here you can see a variety of Films/TV Series from many countries around the world. You can create a new account and have your own personal page where you can save your favorite movies. To learn more about app features, please click on some of the tabs above.
                            </div>
                            <div className='featureImg'>
                                <img src={'/assest/worldCinema.PNG'} alt='world cinema'/>
                            </div>
                
                            
                            
                        </div>
                        
                    </div>}

                    {tabId===2 &&
                    <div className='tour_content'>
                        <h2>Visitor features:</h2>
                        <div className='app_features'>
                            <ul className='text'>
                                <li>Movie details, user pages (created by other registered users) and artist pages(created by admin)</li>
                                <li>Hide and report comments/reviews from other users to page admin.</li>
                                <li>Form validations (for registration)</li>
                            </ul>
                            <div className='featureImg'>
                                <img src={'/assest/watching.PNG'} alt='watching movie'/>
                            </div>
                        </div>
                        
                    </div>}

                    {tabId===3 &&
                    <div className='tour_content'>
                        <h2>User features:</h2>
                        <div className='app_features'>
                            <ul className='text'>
                                <li>Post, edit, delete, rate (upvote,downvote) reviews for a movie</li>
                                <li>Edit personal information (from their User Page)</li>
                                <li>Data protection: bcrypt and JWT</li>
                                <li>Help: Username recovery/password reset </li>
                            </ul>
                            <div className='featureImg'>
                                <img src={'/assest/review1.PNG'} alt='review'/>
                            </div>
                        </div>
                        
                    </div>}

                    {tabId===4 &&
                    <div className='tour_content'>
                        <h2>Admin features</h2>
                        <div className='app_features'>
                            <ul className='text'>
                                <li>Create,edit, delete data</li>
                                <li>Publish/unpublish a movie</li>
                                <li>Block/unblock a user</li>
                                <li>Delete users reviews.</li>
                            </ul>
                            <div className='featureImg'>
                                <img src={'/assest/admin.PNG'} alt='admin'/>
                            </div>
                        </div>
                    </div>}
                    
                </div>}
            </div>
        )
    }
}