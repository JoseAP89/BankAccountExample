import {StyledNavBar} from './Styled'

interface NavigationElement {
  title: string;
  url: string;
}

const NavigationBar = () => {
	const menuList : Array<NavigationElement> = [
	    { title: "Inicio", url: "/"},
	    { title: "Alta", url: "/signup"},
	    { title: "Apertura", url: "/opensavingsaccount"},
	    { title: "Transacciones", url: "#/transactions"}
	 ];

	return (
		<StyledNavBar>
	        <div className="topnav">
	          { menuList.map( (m,i) =>{
	              return (
	                <div className="tab-nav" key={i}>
	                  <a  href={m.url}>{m.title}</a>
	                </div>
	              )
	            })
	          }
	        </div>
      	</StyledNavBar>
	);
};
export default NavigationBar;