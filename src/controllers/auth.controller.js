export const registerController = (req, res) => {
    const { name, email, password } = req.body

    // APPLY THE VALIDATIONS    

    console.log("Request of post method has the body: ",req.body)
    res.json({ status: 'OK' })
}