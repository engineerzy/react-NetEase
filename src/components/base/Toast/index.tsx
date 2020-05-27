import ReactDOM from 'react-dom';
import Toast, { Props } from './toast';

function createToast() {
	let timer = null
	const div = document.createElement('div')
	return {
		addToast (props: Props) {
			if(timer) clearTimeout(timer);
			ReactDOM.render(Toast(props), div) 
			document.querySelector('body').appendChild(div)
			timer = setTimeout(() => {
					this.removeToast()
				}, props.duration > 0 ?  props.duration : 1800);
		},
		removeToast () {
			document.querySelector('body').removeChild(div)
		}
	}
}

function notice(props: Props) {
	createToast().addToast(props)
}

export default {
	info(props: Props) {
		notice({...props, type: ''})
	},
	success(props: Props) {
		notice({...props, type: 'success'})
	},
	error(props: Props) {
		notice({...props, type: 'error'})
	},
	warning(props: Props) {
		notice({...props, type: 'warning'})
	}
}

 