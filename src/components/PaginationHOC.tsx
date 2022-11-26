import "./PaginationHOC.css";
import Pagination from "@mui/material/Pagination";

interface IPaginationHOCProps {
    count: number;
    handleChangePage: (value: number) => void;
    page: number;
    listLength: number;
    limitCountNumber: number;
}

const PaginationHOC: React.FC<IPaginationHOCProps> = ({
   count,
   handleChangePage,
   page,
   listLength,
   limitCountNumber = 1,
}) => {
   const firsCountNumber = page <= 1 ? 1 : (page - 1) * limitCountNumber + 1;
   const shownCountNumber = page <= 1 ? listLength : firsCountNumber - 1 + listLength;
   
   return (
      <div className="paginationWrapper">
         <div>
            <p className="showCountText">
               {`Showing ${firsCountNumber} to ${shownCountNumber} of ${count} entries`}
            </p>
         </div>
         <Pagination
            onChange={(event, value) => handleChangePage(value)}
            page={page}
            count={count && Math.ceil(count / limitCountNumber)}
            color={"primary"}
         />
      </div>
   );
};

export default PaginationHOC;