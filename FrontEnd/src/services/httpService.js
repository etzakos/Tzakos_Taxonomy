import axios from "axios";

// axios.interceptors.response.use(null, (error) => {
// 	// Unexpected Errors (network down, server down, db down, bug)
// 	// - Log them
// 	// - Display a generic and friendly message
// 	const expectedError =
// 		error.response &&
// 		error.response.status >= 400 &&
// 		error.response.status < 500;

// 	if (!expectedError) {
// 		logger.log(error);
// 		toast("An unexpected error occured");
// 	}
// 	return Promise.reject(error);
// });

const a = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default a;
