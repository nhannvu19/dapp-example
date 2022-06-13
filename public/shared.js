const HOST = 'https://api-k8s2.vax.uat.quoine.com';
const CHECK_SYNC = '^true';

function headers(path) {
  return { headers: { 'X-Quoine-Auth': sign(path), 'origin': 'https://vax-uat-k8s2.web.quoine.com' } }
}

function sign(path) {
  const header = {
    alg: 'HS256',
  };
  const payload = {
    device: 'ios-native',
    token_id: localStorage.getItem('tokenId'),
    nonce: parseInt(Date.now()),
    path,
  };
  const secret = localStorage.getItem('tokenSecret');
  const auth = KJUR.jws.JWS.sign("HS256", header, payload, secret);
  return auth;
};
