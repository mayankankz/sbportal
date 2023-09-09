export function isLoggedIn() {
    // Check if the "isLoggedIn" key exists in localStorage
    console.log('opishdfiasfhniasd',localStorage.getItem("isloggedIn"));
    return localStorage.getItem("isloggedIn") === 'user';
  }