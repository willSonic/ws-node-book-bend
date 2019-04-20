/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AuthorizationsController } from './../../service-layer/controllers/AuthorizationController';
import { UsersController } from './../../service-layer/controllers/UsersController';
import { CommentsController } from './../../service-layer/controllers/CommentsController';
import { BooksController } from './../../service-layer/controllers/BooksController';
import { ProfilesController } from './../../service-layer/controllers/ProfileController';
import { expressAuthentication } from './../../business-layer/security/Authentication';
import * as express from 'express';

const models: TsoaRoute.Models = {
    "IUserResponse": {
        "properties": {
            "id": { "dataType": "string" },
            "userName": { "dataType": "string" },
            "firstName": { "dataType": "string" },
            "lastName": { "dataType": "string" },
            "email": { "dataType": "string" },
        },
    },
    "IUserLoginRequest": {
        "properties": {
            "userName": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
    },
    "ISuccessResponse": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
            "message": { "dataType": "string", "required": true },
        },
    },
    "IUserCreateRequest": {
        "properties": {
            "userName": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
    },
    "IErrorResponse": {
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
        },
    },
    "IUserUpdateRequest": {
        "properties": {
            "id": { "dataType": "string" },
            "userName": { "dataType": "string" },
            "firstName": { "dataType": "string" },
            "lastName": { "dataType": "string" },
            "email": { "dataType": "string" },
            "admin": { "dataType": "boolean" },
        },
    },
    "IBookResponse": {
        "properties": {
            "id": { "dataType": "string" },
            "googleId": { "dataType": "string" },
            "authors": { "dataType": "array", "array": { "dataType": "string" } },
            "averageRating": { "dataType": "double" },
            "description": { "dataType": "string" },
            "imageLinks": { "dataType": "any" },
            "pageCount": { "dataType": "double" },
            "subtitle": { "dataType": "string" },
            "title": { "dataType": "string" },
            "categories": { "dataType": "array", "array": { "dataType": "string" } },
            "ratingsCount": { "dataType": "double" },
            "publishedDate": { "dataType": "datetime" },
            "publisher": { "dataType": "string" },
            "createdAt": { "dataType": "datetime" },
            "modifiedAt": { "dataType": "datetime" },
        },
    },
    "ICommentResponse": {
        "properties": {
            "id": { "dataType": "string" },
            "book": { "ref": "IBookResponse" },
            "user": { "ref": "IUserResponse" },
            "text": { "dataType": "string" },
            "createdAt": { "dataType": "datetime" },
            "modifiedAt": { "dataType": "datetime" },
        },
    },
    "ICommentCreateRequest": {
        "properties": {
            "bookRef": { "dataType": "string", "required": true },
            "userRef": { "dataType": "string", "required": true },
            "text": { "dataType": "boolean", "required": true },
        },
    },
    "ICommentUpdateRequest": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "bookRef": { "dataType": "string", "required": true },
            "userRef": { "dataType": "string", "required": true },
            "text": { "dataType": "boolean", "required": true },
        },
    },
    "ICommentResponses": {
    },
    "IBookCreateRequest": {
        "properties": {
            "googleId": { "dataType": "string", "required": true },
            "authors": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "averageRating": { "dataType": "double" },
            "description": { "dataType": "string" },
            "imageLinks": { "dataType": "any" },
            "pageCount": { "dataType": "double" },
            "subtitle": { "dataType": "string" },
            "title": { "dataType": "string" },
            "categories": { "dataType": "array", "array": { "dataType": "string" } },
            "ratingsCount": { "dataType": "double" },
            "publishedDate": { "dataType": "datetime" },
            "publisher": { "dataType": "string", "required": true },
        },
    },
    "IMessageResponse": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "user": { "ref": "IUserResponse", "required": true },
            "messageType": { "dataType": "string", "required": true },
            "messageText": { "dataType": "string", "required": true },
            "reviewedAt": { "dataType": "datetime", "required": true },
            "modifiedAt": { "dataType": "datetime", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
        },
    },
    "IBookedResponse": {
        "properties": {
            "id": { "dataType": "string" },
            "user": { "ref": "IUserResponse", "required": true },
            "book": { "ref": "IBookResponse", "required": true },
            "returnDate": { "dataType": "datetime" },
            "active": { "dataType": "boolean", "required": true },
            "createdAt": { "dataType": "datetime" },
            "modifiedAt": { "dataType": "datetime" },
        },
    },
    "IProfileResponse": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "user": { "ref": "IUserResponse", "required": true },
            "checkedOutCount": { "dataType": "double", "required": true },
            "waitListCount": { "dataType": "double", "required": true },
            "comments": { "dataType": "array", "array": { "ref": "ICommentResponse" } },
            "messages": { "dataType": "array", "array": { "ref": "IMessageResponse" } },
            "booksOut": { "dataType": "array", "array": { "ref": "IBookedResponse" } },
            "waitList": { "dataType": "array", "array": { "dataType": "any" } },
            "interestCategories": { "dataType": "array", "array": { "dataType": "string" } },
            "createdAt": { "dataType": "datetime", "required": true },
            "modifiedAt": { "dataType": "datetime", "required": true },
        },
    },
    "IProfileCreateRequest": {
        "properties": {
            "user": { "dataType": "string", "required": true },
            "checkedOutCount": { "dataType": "double" },
            "waitListCount": { "dataType": "double" },
            "commentRefs": { "dataType": "array", "array": { "dataType": "string" } },
            "messageRefs": { "dataType": "array", "array": { "dataType": "string" } },
            "booksOut": { "dataType": "array", "array": { "dataType": "string" } },
            "waitList": { "dataType": "array", "array": { "dataType": "string" } },
            "interestCategories": { "dataType": "array", "array": { "dataType": "string" } },
        },
    },
    "IProfileAddBookResponse": {
        "properties": {
            "isWaitListOption": { "dataType": "boolean", "required": true },
            "bookId": { "dataType": "string" },
            "listPosition": { "dataType": "double" },
            "waitTime": { "dataType": "double" },
            "profile": { "ref": "IProfileResponse" },
        },
    },
    "IProfileAddBookRequest": {
        "properties": {
            "userId": { "dataType": "string", "required": true },
            "book": { "ref": "IBookCreateRequest", "required": true },
        },
    },
    "IProfileUpdateRequest": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "user": { "ref": "IUserResponse", "required": true },
            "checkedOutCount": { "dataType": "double" },
            "waitListCount": { "dataType": "double" },
            "commentRefs": { "dataType": "array", "array": { "dataType": "string" } },
            "messageRefs": { "dataType": "array", "array": { "dataType": "string" } },
            "booksOut": { "dataType": "array", "array": { "dataType": "string" } },
            "waitList": { "dataType": "array", "array": { "dataType": "string" } },
            "interestCategories": { "dataType": "array", "array": { "dataType": "string" } },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.post('/api/Authorizations/Login',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IUserLoginRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthorizationsController();


            const promise = controller.login.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Authorizations/Logout',
        function(request: any, response: any, next: any) {
            const args = {
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthorizationsController();


            const promise = controller.logout.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IUserCreateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.RegisterNewUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Users/:userId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.GetUserById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Users/userName/:userName',
        function(request: any, response: any, next: any) {
            const args = {
                userName: { "in": "path", "name": "userName", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.GetUserByUsername.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/api/Users',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IUserUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.UpdateUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Comments',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "ICommentCreateRequest" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentsController();


            const promise = controller.CreateNewComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/api/Comments',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "ICommentUpdateRequest" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentsController();


            const promise = controller.UpdateComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Comments/byUser/:userId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentsController();


            const promise = controller.GetAllCommentsFromAUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Comments/onBook/:bookId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                bookId: { "in": "path", "name": "bookId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentsController();


            const promise = controller.GetAllCommentsOnBook.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/api/Comments/:commentId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                commentId: { "in": "path", "name": "commentId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CommentsController();


            const promise = controller.DeleteExistingCommentById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Books',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IBookCreateRequest" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BooksController();


            const promise = controller.CreateNewBook.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Books/bookTitle/:title',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                title: { "in": "path", "name": "title", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BooksController();


            const promise = controller.GetBookByTitle.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Books/fromGoogle/:googleId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                googleId: { "in": "path", "name": "googleId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BooksController();


            const promise = controller.GetBookByGoogleId.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Books/book/:bookId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                bookId: { "in": "path", "name": "bookId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BooksController();


            const promise = controller.GetBookById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/api/Books/:bookId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                bookId: { "in": "path", "name": "bookId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BooksController();


            const promise = controller.DeleteExistingBookById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Profiles',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IProfileCreateRequest" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProfilesController();


            const promise = controller.createNewProfile.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/Profiles/:profileId',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                profileId: { "in": "path", "name": "profileId", "required": true, "dataType": "string" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProfilesController();


            const promise = controller.GetProfileById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/api/Profiles/addBook',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IProfileAddBookRequest" },
                authentication: { "in": "header", "name": "x-access-token", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                 return next(err);
            }

            const controller = new ProfilesController();


            const promise = controller.AddBookRequest.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.put('/api/Profiles',
        authenticateMiddleware([{ "api_key": [] }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "IProfileUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProfilesController();


            const promise = controller.UpdateProfile.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, _response: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = function(user: any) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            }

            const fail = function(error: any) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = 401;
                    next(error)
                }
            }

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(expressAuthentication(request, name, secMethod[name]));
                    }

                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
