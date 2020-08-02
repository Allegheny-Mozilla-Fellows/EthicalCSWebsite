import React, {FunctionComponent} from "react";
import styled from "styled-components";
import Bio from "@nehalist/gatsby-theme-nehalem/src/components/bio";
import Theme from "@nehalist/gatsby-theme-nehalem/src/styles/theme";
import Carbon from "react-carbon";
import AdStyle from "./style";

const StickySidebarContent = styled.div`
  position: sticky;
  top: 30px;
`;

const SidebarContent: FunctionComponent = () => {
  return (
    <StickySidebarContent>

      <Bio textAlign={`flush left`} />

    </StickySidebarContent>
  );
};

export default SidebarContent;
