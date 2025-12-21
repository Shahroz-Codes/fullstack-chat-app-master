# ✨ Full Stack Realtime Chat App ✨

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client

### Setup .env file

```js
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```

### Start frontend

```shell
cd frontend
npm run dev
```

## 🌐 LAN/Network Access Setup

To run the app on multiple devices on the same network (LAN):

### 1. Backend Server (Port 5001)
The backend is already configured to listen on all network interfaces (`0.0.0.0`).

### 2. Frontend Server (Port 5173)
The frontend is configured to listen on all network interfaces for LAN access.

### 3. Access from Other Devices
1. **Find your computer's IP address:**
   - Windows: Run `ipconfig` in Command Prompt
   - Linux/Mac: Run `ifconfig` or `ip addr`
   - Look for IPv4 address (e.g., `192.168.1.100`)

2. **Access the app:**
   - Frontend: `http://YOUR_IP:5173`
   - Backend API: `http://YOUR_IP:5001`

3. **Example:**
   ```
   Frontend: http://192.168.1.100:5173
   Backend:  http://192.168.1.100:5001
   ```

### 4. Firewall Settings
Make sure ports 5001 and 5173 are open in your firewall for LAN access.

### 5. Troubleshooting
- If login doesn't work, check browser console for CORS errors
- Ensure both devices are on the same WiFi network
- Try disabling firewall temporarily for testing