

const getMessaging = require('firebase-admin/messaging')
const express = require("express")

const app = express()
const port = 3000
app.use(express.json())

app.post("/send", async (req, res) => {

    const token = req.body.token
    const msg = req.body.msg

    await initAdmin() // Check if the FB admin in initialized, if not then start it
    let data = await getMessaging().send({
        token : token, // the Device Token
        notification : {
          title : "My Notification Guide",
          body : msg // the message we want to be displayed in the notification
        }
      })
    
    res.json([{data : data}])
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


