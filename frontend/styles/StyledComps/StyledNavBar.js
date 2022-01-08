import styled from 'styled-components';

const StyledNavBar = styled.div`
    background-color:#333;
    a {
        color: #eaeaea
    }
    .responsive {
        display: none;
    }
    .expanded {
        .linkContainer{
            width: 140px;
            height: 60px;
            padding: 10px;
            a {
                width: 100%;
                height: 100%;
            }
        }
        .linkContainer:hover {
            background-color: #4f86f7;
        }
    }

    @media (max-width: 600px) { 
        .expanded {
            display: none;
        }
        .responsive {
            display: block;
            a {
                color: black;
            }
            .burger-icon {
                color: white;
            }
        }
    }


`;

export {StyledNavBar}; 