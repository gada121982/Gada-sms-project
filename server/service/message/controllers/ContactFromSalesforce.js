const jsforce = require('jsforce')
const JWT = require('jsonwebtoken')
const cleanDataFromSalesforce = require('../utils/cleanDataFromSp')
const UserSF = require('../../../models/UserSF')
require('dotenv').config()

const QUERY = 'SELECT Name, MobilePhone FROM Contact'

module.exports.getContact = async (req, res) => {
  const TOKEN = req.cookies.access_token
  let userId = ''
  let dataUser = []
  try {
    userId = JWT.decode(TOKEN, process.env.PRIVATE_KEY).user_id
  } catch (e) {
    res.send({
      status: false
    })
    throw new Error('In valid token, detected hacker', e)
  }
  try {
    dataUser = await UserSF.find({ user_id: userId })
  } catch (error) {
    res.send({
      status: false,
      errorCode: 1 // redirect to login saleforce page, after get respond => client will handle it
    })
    throw new Error(error)
  }

  if (dataUser.length > 0) {
    try {
      const connection = new jsforce.Connection({
        instanceUrl: dataUser[0].instance_url,
        accessToken: dataUser[0].access_token
      })

      try {
        const pendingData = await connection.query(QUERY)
        const cleanData = cleanDataFromSalesforce(pendingData.records)

        // for test purpose
        cleanData.push({
          customerName: 'Vinh Hai',
          phoneNumber: '0342350466'
        })

        res.send({
          status: true,
          payload: cleanData
        })
        return
      } catch (error) {
        res.send({
          status: false,
          errorSalesforce: "Your salesforce account do'nt supports REST API"
        })
        return
      }
    } catch (error) {
      res.send({
        status: false,
        errorCode: 1
      })
      return
    }
  }
  if (dataUser.length === 0) {
    res.send({
      status: false,
      errorCode: 1 // redirect to login saleforce page
    })
  }
}
