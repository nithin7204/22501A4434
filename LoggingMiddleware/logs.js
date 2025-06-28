const axios = require('axios');

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaXRoaW5rdW1hcmt1bmNoYWxhQGdtYWlsLmNvbSIsImV4cCI6MTc1MTA4OTM5NiwiaWF0IjoxNzUxMDg4NDk2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzdmMzAzNDgtYTkyMy00OGU3LWFjM2MtYTQ5MzFkOGQzMWJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0aGluIGt1bWFyIGt1bmNoYWxhIiwic3ViIjoiODg4MTk2ZDItMmM4ZS00MTcwLTgzODctOGYwODBhODgyYjM3In0sImVtYWlsIjoibml0aGlua3VtYXJrdW5jaGFsYUBnbWFpbC5jb20iLCJuYW1lIjoibml0aGluIGt1bWFyIGt1bmNoYWxhIiwicm9sbE5vIjoiMjI1MDFhNDQzNCIsImFjY2Vzc0NvZGUiOiJlSFdOenQiLCJjbGllbnRJRCI6Ijg4ODE5NmQyLTJjOGUtNDE3MC04Mzg3LThmMDgwYTg4MmIzNyIsImNsaWVudFNlY3JldCI6IndiTmJTcWJIaktkbnNuaFMifQ.ToeF-jw0LSOBw1VYatoRtT7O6wCfEyeAuCpFaYXN6fM';

async function log(stack, level, packageName, message) {
  const logData = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    await axios.post(
      LOG_API_URL,
      logData,
      {
        headers: {
          Authorization: AUTH_TOKEN
        }
      }
    );
  } catch (error) {
    // Silently fail, do not use console.log or throw
  }
}

module.exports = log;