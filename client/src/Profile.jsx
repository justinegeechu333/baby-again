import { Grid, Segment } from "semantic-ui-react";
import { ProfileUpdate } from "./ProfileUpdate";
import { RentedList } from "./RentedList";

export function Profile() {
    return (
        <div className="pt-4">
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <div className="max-w-xl mx-auto pt-4">
                                <ProfileUpdate />
                            </div>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <RentedList />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}
