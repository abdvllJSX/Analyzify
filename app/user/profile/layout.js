import Sidebar from '../../../components/sidebar'

const layout = ({children}) => {
  return (
    <div>
        <Sidebar />
        {children}
    </div>
  )
}

export default layout