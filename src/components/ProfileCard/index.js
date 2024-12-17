import './index.css'
function ProfileCard(props){
    const {profileData}=props;
    const {name,profile_image_url,short_bio}=profileData;
    return(
        <div className="profile-card">
            <img src={profile_image_url} className="profile-avatar"/>
            <p className="profile-name">{name}</p>
            <p className="profile-bio">{short_bio}</p>
        </div>
    );
}
export default ProfileCard;