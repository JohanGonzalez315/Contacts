type LoadingViewProps = {
    loading: boolean
}

type ContactCardProps = {
    item: ContactData,
    action: (item: ContactData) => void;
}

type RenderPhotoProps = {
    photo: string | undefined;
    name: string | undefined;
    size: number;

}

type ContactModalProps = {
    closeModal: ()=>void;
    visible: boolean,
    item: ContactData | undefined
}