import styled from 'styled-components';

const StyledNavBar = styled.div`
.topnav{
    background-color:#333;
    height: 40px;
    display: flex;
    flex-direction: row;
}
.topnav .tab-nav{
    display: flex;
    align-items: center;
      
}
.topnav .tab-nav a {
    color: #eaeaea;
    padding: 20px;
    font-size: 20px;
} 
.topnav .tab-nav:hover {
    background-color: #778899;
}


@media (max-width: 600px) { 
	.topnav{
		display: flex;
	    flex-direction: column;
	    height:fit-content;
	}
    
    .topnav .tab-nav{
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}

`;

export {StyledNavBar}; 
