import "../../css/bootstrap.css"

function TopicScore({ name, score }) {
    return (
        <div className="row">
            <p className="col-auto text-secondary">{name}</p>
            <p className="col text-end fw-bold">{score}</p>
        </div>
    )
}

function CategoryOverview({ name, topics }) {
    return (
        <div className="col-6 flex-column justify-content-start text-start">
            <div className="row  border-bottom ">
                <p className="h5 col-auto pb-1">{name}</p>
                {/* CALCULATES SUM OF CATEGORY SCORES */}
                <p className="h5 col text-end">{topics.map(topic => topic.score).reduce((sum, score) => sum + score, 0)}</p>
            </div>
            <div className="">
                {topics.map(topic => <TopicScore name={topic.name} score={topic.score} />)}
            </div>
        </div>
    )
}

export default function Overview({ categories }) {
    return (
        <div className='row gx-5 gy-3'>
            {categories.map(category => <CategoryOverview name={category.name} topics={category.topics} />)}
        </div>
    )
}