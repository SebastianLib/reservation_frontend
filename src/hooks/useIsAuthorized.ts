import { BusinessEntity } from "@/models/business";

type UseIsAuthorizedProps = {
    userId: number;
    business: BusinessEntity;
}

export const useIsAuthorized = ({userId, business}:UseIsAuthorizedProps) => { 
    const isWorker = business.workers?.some((user) => user.id === userId);
    const isOwner = business.owner?.id === userId;
    const isAuthorized = isOwner || isWorker;
    
    return isOwner || isWorker;
}
