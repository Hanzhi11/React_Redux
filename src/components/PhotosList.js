import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Button from './Button'
import Skeleton from "./Skeleton"
import PhotosListItem from "./PhotosListIterm"

function PhotosList ({album}) {
    const {data, error, isFetching} = useFetchPhotosQuery(album)
    const [addPhoto, results] = useAddPhotoMutation()

    const handleAdd = ()=>{
        addPhoto(album)
    }

    let content
    if (isFetching){
        content = <Skeleton className='h-8 w-8' times={4}/>
    } else if (error) {
        content = <div>has error</div>
    } else {
        content = data.map(photo => {
            return <PhotosListItem key={photo.id} photo={photo}/>
        })
    }


    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="txt-lg font-bold">Photos in {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAdd}>
            + Add Photo
        </Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
}

export default PhotosList