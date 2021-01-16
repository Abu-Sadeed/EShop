import React from 'react'
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center'>
                        Abu Sadeed
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-3'>
                    <a style={{color: 'black'}} href={`mailto:abusadeed@iut-dhaka.edu`}>
                        <MailIcon/>
                    </a>
                            
                        
                    <a className='px-3' style={{color: 'black'}} href='https://www.linkedin.com/in/abusadeed/'>
                        <LinkedInIcon/>
                    </a>

                    <a style={{color: 'black'}} href='https://github.com/KillerQueen-BitesZaDusto'>
                        <GitHubIcon/>
                    </a>
                            
                        
                    </Col>
                </Row>

            </Container>
        </footer>
        
    )
}

export default Footer
