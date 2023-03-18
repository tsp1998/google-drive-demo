const google = require('googleapis')
const { readFile } = require('fs/promises')

const main = async () => {
  try {
    const content = await readFile('royaltsp-node.json', 'utf-8')
    const creds = JSON.parse(content)
    const oauthClient = new google.Auth.OAuth2Client({
      clientId: creds.client_id,
      clientSecret: creds.client_secret,
    })
    oauthClient.setCredentials({
      access_token: creds.access_token,
      refresh_token: creds.refresh_token,
      scope: creds.scopes.join(' ')
    })
    let client = new google.drive_v3.Drive({ auth: oauthClient })
    let query = `name='Downloads'`
    const response = await client.files.list({
      q: query,
      fields: 'files(id)'
    });
    console.log(`files`, response.data.files)
  } catch (error) {
    console.log(`error`, error)
  }
}

main()