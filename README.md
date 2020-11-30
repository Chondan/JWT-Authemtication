# JWT Authentication

- Generate secret key 
	- `require('crypto').randomBytes(48, function(err, buffer) { var token = buffer.toString('hex'); console.log(token); });`
- Test API Online 
	- Link: https://reqbin.com/
- Token expiration
	- `jwt.sign(payload, secret_key, { expiresIn: "15s" };`
	- more info: https://www.npmjs.com/package/jsonwebtoken
- Refresh Token
	- normally, stored on database or some form of redis cache.
	
- TOKEN -> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJjaG9uZGFuIiwiaWF0IjoxNjA2NzI5OTQ4Nzc0fQ.jJldEDDq2TOADgY3rK-n5aqYpR-Z77-ezRPizg-zToQ"

- OSI MODEL
	1. application layer
	2. presentation layer -> compress, un-compress, encode, decode
	3. session layer -> opening, closing connection (Maintains connections)
	4. transport layer -> break up data into segment, establish tcp/ip connection, flow control
	5. network layer -> breakup segment into packet, decide which phsical path the data will take
	6. data link layer -> breakup packet into binary frame
	7. physical later -> transmits raw bit streat over the physical medium

- Additional Reading Lists
	- [Refresh token with JWT authentication in Node.js](https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/#:~:text=js,-3%20May%2C%202019&text=When%20designing%20a%20web%20application,it%20and%20make%20it%20usable.)