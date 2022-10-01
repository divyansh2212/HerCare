import TablePagination from "@material-ui/core/TablePagination";
import { useState } from "react";
import "./SafetyTipsScrollbar.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SafetyTipsContext } from "../../context/SafetyTipsContext";
import SafetyTipsCard from "../SafetyTipsCard/SafetyTipsCard.jsx";

export default function SimpleTable() {
    const {
        locationsst,
        setLocationsst,
        showsafetyTipsfrom,
        setShowsafetyTipsfrom
    } = useContext(SafetyTipsContext);

    const { data, loading, reFetch } = useFetch(
        `/getAllSafetyTips?locationsst=${locationsst}&showSafetyTipsfrom=${showsafetyTipsfrom}`
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className="fullPage">
                <div className="gridParent">
                    {data.length === 0 && (
                        <div className="nothinghere">
                            No Safety Tips to show here&nbsp;&nbsp;
                            <VisibilityOffIcon />
                        </div>
                    )}
                    {data.length > 0 &&
                        data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <SafetyTipsCard className="gridChild"
                                    title={row.title}
                                    typeOfViolence={row.typeOfViolence}
                                    desc={row.message}
                                />
                            ))}
                </div>
                <div className="paginationfooter">
                    {data.length > 0 && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

