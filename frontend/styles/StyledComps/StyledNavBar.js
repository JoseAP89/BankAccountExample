import styled from 'styled-components';

const StyledNavBar = styled.div`
.topnav{
    background-color:#333;
    height: 40px;
    display: flex;
    flex-direction: row;
    .tab-nav{
        display: flex;
        align-items: center;
        a {
            color: #eaeaea;
            padding: 20px;
            font-size: 20px;
        }   
    }
    .tab-nav:hover {
        background-color: #778899;
    }


    @media (max-width: 600px) { 
        display: flex;
        flex-direction: column;
        height:fit-content;
        .tab-nav{
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }

}
`;

export {StyledNavBar}; 