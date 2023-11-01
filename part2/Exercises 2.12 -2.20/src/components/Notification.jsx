

const Notification = ({notification}) => {
    const {type, text} = notification

    if(text === "") {
      return null
    }
    
    const notificationClass = type === "Error" ? "error" : "success"
    
  return (
    <>
      <div className={notificationClass}>
          {text} 
      </div> 
    </>
  )
}

export default Notification
