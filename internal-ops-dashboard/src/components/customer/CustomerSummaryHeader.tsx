import {mockCustomerSummary} from '../../mock/customerSummary.mock';

export function CustomerSummaryHeader () {
    // side-effect / debug logging should happen outside JSX
    console.log(mockCustomerSummary.id);

    return (
        <>
            <div>
                <ul key={mockCustomerSummary.id}>
                    <li>{mockCustomerSummary.name}</li>
                    <li>{mockCustomerSummary.email}</li>
                    <li>{mockCustomerSummary.status}</li>
                    <li>{mockCustomerSummary.riskStatus}</li>
                    <li>{mockCustomerSummary.flagsCount}</li>
                    <li>{mockCustomerSummary.notesCount}</li>
                    <li>{mockCustomerSummary.createdAt}</li>
                </ul>
            </div>
        </>
    );
}