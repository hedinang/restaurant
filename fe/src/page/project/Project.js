import { Col, Row } from "antd"

export default function Project() {
    const kindOfProjectList = ['All', 'Website', 'Mobile', 'AI']
    return <div className="project-container">
        <h2>Our project</h2>
        <Row>
            <Col span='8'>

            </Col>
            <Col span='8'>
                <Row>
                    {kindOfProjectList.map(e => <Col span={6} className="project-item">{e}</Col>)}
                </Row>
            </Col>
            <Col span='8'>

            </Col>
        </Row>
    </div>

}