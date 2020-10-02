import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './utils.css'
//import { checkPropTypes } from 'prop-types'

export function MovieBox(movie={},id,icons) {
    const genres= movie.genres || []
    const buttons= ControlButtons(icons)
    return (
        <div className='box' key={id}>
            <div className='boxNav'>
                <h3>{movie.title}</h3>
                {buttons}
            </div>
            <div className='boxFooter'>
                <span>{movie.country}{' | '}{movie.year}{' | '}{genres.join(' ')}</span>
            </div>
        </div>
    )   
}
export function InfoBox(person,index,icons=[],path='',boolean) {
    const buttons= ControlButtons(icons)
    const name= (person.full_name) ? person.full_name : person.first_name+' '+person.last_name
    const defaultAvatar= (person.gender==='Female')
    ?'https://fajslawice24.pl/wp-content/uploads/2014/09/Kontur-twarzy-kobiety.jpg' 
    :'https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic-300x300.jpg'
    const miniAvatar= <img className='mini-avatar'alt='avatar' 
    src={(person.avatar) ? person.avatar :defaultAvatar}/>
    const header= (boolean)? <h2><Link to={path+person.id} aria-label='profile-page'>{name}</Link></h2>:<h1>{name}</h1>
    const flag= (person.country)? `https://www.countryflags.io/${person.country}/flat/64.png`: ''

    return(
        <div className='basicInfo' key={index}>
            <header>
                {boolean && miniAvatar}
                {header}
                <img className='flag' alt='flag'src={flag} onError={(e)=>{
                    e.target.onError= null;
                    e.target.src='https://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg'
                }}></img>
                {buttons}
            </header>
            <div>
                {(person.title)&&<span>{person.title}{' | '}</span>}  
                {(person.birth_year)&&<span>Born:{' '}{person.birth_year}{' | '}</span>}
                {(person.age)&&<span>Age:{' '}{person.age}{' | '}</span>}
                {(person.title)
                ?<span><Link to={'/artists/country/'+person.country}aria-label='artist-list'>{person.country}</Link>{' | '}</span>
                :<span>{person.country}{' | '}</span>}
                {(person.username)&&<span>Username:{' '}{person.username}{' | '}</span>}
            </div>
        </div>
    )
}
export function ProfileBox(props){
    const person= props.person || {}
    const defaultAvatar= (person.gender==='Female')
    ?'https://fajslawice24.pl/wp-content/uploads/2014/09/Kontur-twarzy-kobiety.jpg' 
    :'https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic-300x300.jpg'

    const box= InfoBox(person)
    
    return (
        <div className='profile'>
            <img className='avatar'alt='avatar' 
                src={(person.avatar) ? person.avatar :defaultAvatar}/>
            <div className='info'>
                {box}
                {props.boolean && <button onClick={props.handleEdit}>Edit</button>}
            </div>
               
        </div>
    )
}
export function UserPage(props,user={}, handleSubmit=()=>{}) {
    return (
        <form className='form userPage' onSubmit={handleSubmit}>
            <div>
                <header>Full Name:</header>
                <span>{user.first_name}{' '}{user.last_name}</span>
            </div>
            <div>
                <header>Username:</header>
                <span>{user.username}</span>
            </div>
            <div>
                <header>Age/Country/Gender:</header>
                <span>{user.age}{' | '}{user.country}{' | '}{user.gender}{' | '}</span>
            </div>
            <div>
                <header>Password:</header>
                <input name='password'type='text' id='passwordReset'/>
            </div>
            <div>
                <header>Add to Blocked List</header>
                <select  name='block_list'>
                    <option value='false'>False</option>
                    <option value='true'>True</option>
                </select>
            </div>
            <div className='form_control'>
                <input type='button' value='Cancel'
                    onClick={()=>props.history.push('/admin/users')}/>
                <input type="submit" value='SAVE'/>
                <input type='button' value='Reset PASS' onClick={()=>{
                    const randomPass= Math.random().toString(36).substring(2,6)+ '@'+ Math.random().toString(36).substring(2,6)
                    document.getElementById('passwordReset').value=randomPass
                }}/>
            </div>
        </form>
    )
}
export function ReviewControlButtons(){
    return (
        <div>
            <FontAwesomeIcon className='control_icons' icon='ThumbsUp'/>
            <FontAwesomeIcon className='control_icons'icon='thumbs-down'/>
            <span>Reply</span>
        </div>
    )
}
export function ControlButtons(icons=[{name:''}]){
    return(
        <div className='control_icons'>
            {icons.map((icon,index)=>
                <FontAwesomeIcon key={index} className='control_icon' 
                icon={icon.name} onClick={icon.method}/>)}
        </div>
    )
}
export function PopUpMessage(message,action) {
    return(
        <div className='popup'>
            <div>{message}</div>
            <div className='buttons'>
                <button onClick={action.handleYes}>YES</button>
                <button onClick={action.handleNo}>NO</button>
            </div>
        </div>
    )
}
export function NoAuthTokenMessage(){
    return (
        <div className='noAuth'>
            <Link to={'/login'}aria-label='login-page'>LOG IN{' '}</Link> or <Link to={'/register'}aria-label='registration-page'>REGISTER{' '}</Link> to post reviews
        </div>
    )
}
function createArray(from,to){
    let array=[]
    for (let i=from; i>=to; i--){
        array.push(i)
    }
    return array
}

export function BirthYear(){
    const array= createArray(2005,1905)
    const options= array.map(i=><option key={i} value={i}>{i}</option>)
    return (
        <>{options}</>
    )  
}
export function MovieYear(){
    const array= createArray(2020,1980)
    const options= array.map(i=><option key={i} value={i}>{i}</option>)
    return (
        <>{options}</>
    )  
}

export function CountryList(){
    return(
    <optgroup label="List of countries (A-Z)" id='countryGroup2'>
        <option value="AF">Afghanistan</option>
        <option value="AL">Albania</option>
        <option value="DZ">Algeria</option>
        <option value="AS">American Samoa</option>
        <option value="AD">Andorra</option>
        <option value="AO">Angola</option>
        <option value="AI">Anguilla</option>
        <option value="AG">Antigua and Barbuda</option>
        <option value="AR">Argentina</option>
        <option value="AM">Armenia</option>
        <option value="AW">Aruba</option>
        <option value="AU">Australia</option>
        <option value="AT">Austria</option>
        <option value="AZ">Azerbaijan</option>
        <option value="BS">Bahamas</option>
        <option value="BH">Bahrain</option>
        <option value="BD">Bangladesh</option>
        <option value="BB">Barbados</option>
        <option value="BY">Belarus</option>
        <option value="BE">Belgium</option>
        <option value="BZ">Belize</option>
        <option value="BJ">Benin</option>
        <option value="BM">Bermuda</option>
        <option value="BT">Bhutan</option>
        <option value="BO">Bolivia</option>
        <option value="BA">Bosnia and Herzegovina</option>
        <option value="BW">Botswana</option>
        <option value="BR">Brazil</option>
        <option value="BN">Brunei Darussalam</option>
        <option value="BG">Bulgaria</option>
        <option value="BF">Burkina Faso</option>
        <option value="BI">Burundi</option>
        <option value="KH">Cambodia</option>
        <option value="CM">Cameroon</option>
        <option value="CA">Canada</option>
        <option value="CV">Cape Verde</option>
        <option value="KY">Cayman Islands</option>
        <option value="CF">Central African Republic</option>
        <option value="TD">Chad</option>
        <option value="CL">Chile</option>
        <option value="CN">China</option>
        <option value="CO">Colombia</option>
        <option value="KM">Comoros</option>
        <option value="CG">Congo</option>
        <option value="CD">DR Congo</option>
        <option value="CK">Cook Islands</option>
        <option value="CR">Costa Rica</option>
        <option value="CI">Côte d'Ivoire</option>
        <option value="HR">Croatia</option>
        <option value="CU">Cuba</option>
        <option value="CW">Curaçao</option>
        <option value="CY">Cyprus</option>
        <option value="CZ">Czech Republic</option>
        <option value="DK">Denmark</option>
        <option value="DJ">Djibouti</option>
        <option value="DM">Dominica</option>
        <option value="DO">Dominican Republic</option>
        <option value="EC">Ecuador</option>
        <option value="EG">Egypt</option>
        <option value="SV">El Salvador</option>
        <option value="GQ">Equatorial Guinea</option>
        <option value="ER">Eritrea</option>
        <option value="EE">Estonia</option>
        <option value="ET">Ethiopia</option>
        <option value="FO">Faroe Islands</option>
        <option value="FJ">Fiji</option>
        <option value="FI">Finland</option>
        <option value="FR">France</option>
        <option value="GF">French Guiana</option>
        <option value="PF">French Polynesia</option>
        <option value="GA">Gabon</option>
        <option value="GM">Gambia</option>
        <option value="GE">Georgia</option>
        <option value="DE">Germany</option>
        <option value="GH">Ghana</option>
        <option value="GI">Gibraltar</option>
        <option value="GR">Greece</option>
        <option value="GL">Greenland</option>
        <option value="GD">Grenada</option>
        <option value="GP">Guadeloupe</option>
        <option value="GU">Guam</option>
        <option value="GT">Guatemala</option>
        <option value="GG">Guernsey</option>
        <option value="GN">Guinea</option>
        <option value="GW">Guinea-Bissau</option>
        <option value="GY">Guyana</option>
        <option value="HT">Haiti</option>
        <option value="VA">Holy See </option>
        <option value="HN">Honduras</option>
        <option value="HK">Hong Kong</option>
        <option value="HU">Hungary</option>
        <option value="IS">Iceland</option>
        <option value="IN">India</option>
        <option value="ID">Indonesia</option>
        <option value="IR">Iran</option>
        <option value="IQ">Iraq</option>
        <option value="IE">Ireland</option>
        <option value="IM">Isle of Man</option>
        <option value="IL">Israel</option>
        <option value="IT">Italy</option>
        <option value="JM">Jamaica</option>
        <option value="JP">Japan</option>
        <option value="JE">Jersey</option>
        <option value="JO">Jordan</option>
        <option value="KZ">Kazakhstan</option>
        <option value="KE">Kenya</option>
        <option value="KI">Kiribati</option>
        <option value="KP">North Korea</option>
        <option value="KR">South Korea</option>
        <option value="KW">Kuwait</option>
        <option value="KG">Kyrgyzstan</option>
        <option value="LA">Lao </option>
        <option value="LV">Latvia</option>
        <option value="LB">Lebanon</option>
        <option value="LS">Lesotho</option>
        <option value="LR">Liberia</option>
        <option value="LY">Libya</option>
        <option value="LI">Liechtenstein</option>
        <option value="LT">Lithuania</option>
        <option value="LU">Luxembourg</option>
        <option value="MO">Macao</option>
        <option value="MK">Macedonia</option>
        <option value="MG">Madagascar</option>
        <option value="MW">Malawi</option>
        <option value="MY">Malaysia</option>
        <option value="MV">Maldives</option>
        <option value="ML">Mali</option>
        <option value="MT">Malta</option>
        <option value="MH">Marshall Islands</option>
        <option value="MQ">Martinique</option>
        <option value="MR">Mauritania</option>
        <option value="MU">Mauritius</option>
        <option value="YT">Mayotte</option>
        <option value="MX">Mexico</option>
        <option value="FM">Micronesia</option>
        <option value="MD">Moldova</option>
        <option value="MC">Monaco</option>
        <option value="MN">Mongolia</option>
        <option value="ME">Montenegro</option>
        <option value="MS">Montserrat</option>
        <option value="MA">Morocco</option>
        <option value="MZ">Mozambique</option>
        <option value="MM">Myanmar</option>
        <option value="NA">Namibia</option>
        <option value="NR">Nauru</option>
        <option value="NP">Nepal</option>
        <option value="NL">Netherlands</option>
        <option value="NC">New Caledonia</option>
        <option value="NZ">New Zealand</option>
        <option value="NI">Nicaragua</option>
        <option value="NE">Niger</option>
        <option value="NG">Nigeria</option>
        <option value="NU">Niue</option>
        <option value="NF">Norfolk Island</option>
        <option value="MP">Northern Mariana Islands</option>
        <option value="NO">Norway</option>
        <option value="OM">Oman</option>
        <option value="PK">Pakistan</option>
        <option value="PW">Palau</option>
        <option value="PS">Palestinian Territory</option>
        <option value="PA">Panama</option>
        <option value="PG">Papua New Guinea</option>
        <option value="PY">Paraguay</option>
        <option value="PE">Peru</option>
        <option value="PH">Philippines</option>
        <option value="PN">Pitcairn</option>
        <option value="PL">Poland</option>
        <option value="PT">Portugal</option>
        <option value="PR">Puerto Rico</option>
        <option value="QA">Qatar</option>
        <option value="RE">Réunion</option>
        <option value="RO">Romania</option>
        <option value="RU">Russian Federation</option>
        <option value="RW">Rwanda</option>
        <option value="BL">Saint Barthélemy</option>
        <option value="SH">Saint Helena</option>
        <option value="KN">Saint Kitts and Nevis</option>
        <option value="LC">Saint Lucia</option>
        <option value="MF">Saint Martin (French part)</option>
        <option value="PM">Saint Pierre and Miquelon</option>
        <option value="VC">Saint Vincent and the Grenadines</option>
        <option value="WS">Samoa</option>
        <option value="SM">San Marino</option>
        <option value="ST">Sao Tome and Principe</option>
        <option value="SA">Saudi Arabia</option>
        <option value="SN">Senegal</option>
        <option value="RS">Serbia</option>
        <option value="SC">Seychelles</option>
        <option value="SL">Sierra Leone</option>
        <option value="SG">Singapore</option>
        <option value="SX">Sint Maarten (Dutch part)</option>
        <option value="SK">Slovakia</option>
        <option value="SI">Slovenia</option>
        <option value="SB">Solomon Islands</option>
        <option value="SO">Somalia</option>
        <option value="ZA">South Africa</option>
        <option value="SS">South Sudan</option>
        <option value="ES">Spain</option>
        <option value="LK">Sri Lanka</option>
        <option value="SD">Sudan</option>
        <option value="SR">Suriname</option>
        <option value="SZ">Swaziland</option>
        <option value="SE">Sweden</option>
        <option value="CH">Switzerland</option>
        <option value="SY">Syrian Arab Republic</option>
        <option value="TW">Taiwan</option>
        <option value="TJ">Tajikistan</option>
        <option value="TZ">Tanzania</option>
        <option value="TH">Thailand</option>
        <option value="TL">Timor-Leste</option>
        <option value="TG">Togo</option>
        <option value="TK">Tokelau</option>
        <option value="TO">Tonga</option>
        <option value="TT">Trinidad and Tobago</option>
        <option value="TN">Tunisia</option>
        <option value="TR">Turkey</option>
        <option value="TM">Turkmenistan</option>
        <option value="TC">Turks and Caicos Islands</option>
        <option value="TV">Tuvalu</option>
        <option value="UG">Uganda</option>
        <option value="UA">Ukraine</option>
        <option value="AE">United Arab Emirates</option>
        <option value="GB">United Kingdom</option>
        <option value="US">United States</option>
        <option value="UY">Uruguay</option>
        <option value="UZ">Uzbekistan</option>
        <option value="VU">Vanuatu</option>
        <option value="VE">Venezuela</option>
        <option value="VN">Viet Nam</option>
        <option value="VG">Virgin Islands, British</option>
        <option value="VI">Virgin Islands, U.S.</option>
        <option value="WF">Wallis and Futuna</option>
        <option value="EH">Western Sahara</option>
        <option value="YE">Yemen</option>
        <option value="ZM">Zambia</option>
        <option value="ZW">Zimbabwe</option>
    </optgroup>)
}
