"use client";
import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

const SideBar = () => {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { data: session } = useSession();
  const userName = session?.user.name;

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex justify-between items-center pl-6">
            <p className="">
              Hey{" "}
              <span className="text-red-500">
                {userName ? userName : "User"} !
              </span>
            </p>
            <p>
              <IconButton variant="text" size="lg" onClick={closeDrawer}>
                <XMarkIcon className="h-6 w-6 stroke-2 hover:text-red-500" />
              </IconButton>
            </p>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal ml-2"
                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={"/"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 "
                        />
                      </ListItemPrefix>
                      Home
                    </ListItem>
                  </Link>
                  <ListItem className="text-gray-700 hover:text-red-500">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Contact
                  </ListItem>
                  <ListItem className="text-gray-700 hover:text-red-500">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    About
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal ml-2"
                  >
                    Categories
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href={"/mobiles"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 "
                        />
                      </ListItemPrefix>
                      Mobiles
                    </ListItem>
                  </Link>

                  <Link href={"/headphones"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Headphones
                    </ListItem>
                  </Link>

                  <Link href={"/watches"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Watches
                    </ListItem>
                  </Link>

                  <Link href={"/televisions"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Televisions
                    </ListItem>
                  </Link>

                  <Link href={"/homelifestyles"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Home & LifeStyles
                    </ListItem>
                  </Link>

                  <Link href={"/electronics"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Electronics
                    </ListItem>
                  </Link>

                  <Link href={"/groceries"}>
                    <ListItem className="text-gray-700 hover:text-red-500">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Groceries
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      </Drawer>
    </>
  );
};

export default SideBar;
