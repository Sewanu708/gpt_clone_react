import { models } from "../../data"


function ModelOutput({ modelResponse, loading, agent }: { modelResponse: string, loading: boolean, agent: string }) {
    const modeldetails = models.find(model => model.key === agent)
    return (
        <div
            className=" w-[70%] flex flex-col gap-2 items-start justify-start mt-2 relative"
        >
            <div className="w-4 h-4">
                <img src={modeldetails?.icon} alt={modeldetails?.name || ''}/>
            </div>
            {
                loading ? <div className="bg-black ai-loading"></div> : <div className="select-text">
                    {modelResponse}
                </div>
            }
        </div>
    )
}

export default ModelOutput