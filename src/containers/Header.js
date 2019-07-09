import { connect } from '../m-react-redux'
import Header from '../components/Header'

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
export default connect(mapStateToProps)(Header)