import { useEffect } from "react"
import { Toast } from "react-bootstrap"

const PopupToast = ({ message, visible, type, timeOut, hideToast }) => {
	let settimeout
	useEffect(() => {
		if (settimeout) {
			clearTimeout(settimeout)
		}
		if (visible) {
			settimeout = setTimeout(() => {
				hideToast()
			}, timeOut)
		}
	}, [visible])

	switch (type) {
		case "failure":
			return <ToastFailure message={message} visible={visible} />
		case "warning":
			return <ToastWarning message={message} visible={visible} />
		default:
			return <ToastSuccess message={message} visible={visible} />
	}
}

const ToastSuccess = ({ message, visible }) => {
	return (
		<Toast
			show={visible}
			className="app-toast"
			style={{ backgroundColor: "#05732f" }}
		>
			<Toast.Body>
				<div dangerouslySetInnerHTML={{ __html: message }}></div>
			</Toast.Body>
		</Toast>
	)
}
const ToastFailure = ({ message, visible }) => {
	return (
		<Toast
			show={visible}
			className="app-toast"
			style={{ backgroundColor: "#cc0202" }}
		>
			<Toast.Body>
				<div dangerouslySetInnerHTML={{ __html: message }}></div>
			</Toast.Body>
		</Toast>
	)
}
const ToastWarning = ({ message, visible }) => {
	return (
		<Toast
			show={visible}
			className="app-toast"
			style={{ backgroundColor: "#ff6a00" }}
		>
			<Toast.Body>
				<div dangerouslySetInnerHTML={{ __html: message }}></div>
			</Toast.Body>
		</Toast>
	)
}

export default PopupToast
