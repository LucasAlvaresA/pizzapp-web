import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
    return <div>Dashboard</div>;
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {},
    };
});
